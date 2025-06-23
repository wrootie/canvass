
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCanvassingRecords } from '../hooks/useCanvassingRecords';
import { validateEmail, validateName } from '../utils/validation';
import { useToast } from '@/hooks/use-toast';
import { Save, UserPlus } from 'lucide-react';

interface AddRecordFormProps {
  editingRecord?: {
    id: string;
    name: string;
    email: string;
    notes: string;
  };
  onSuccess?: () => void;
}

export const AddRecordForm: React.FC<AddRecordFormProps> = ({ editingRecord, onSuccess }) => {
  const { addRecord, updateRecord } = useCanvassingRecords();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        name: editingRecord.name,
        email: editingRecord.email,
        notes: editingRecord.notes
      });
    }
  }, [editingRecord]);

  const validateForm = () => {
    const newErrors = { name: '', email: '', notes: '' };
    let isValid = true;

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (formData.notes.trim().length === 0) {
      newErrors.notes = 'Notes are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    console.log('Submitting form:', { editingRecord: !!editingRecord, formData });

    try {
      let success = false;
      
      if (editingRecord) {
        success = updateRecord(editingRecord.id, formData.name, formData.email, formData.notes);
        console.log('Update result:', success);
      } else {
        success = addRecord(formData.name, formData.email, formData.notes);
        console.log('Add result:', success);
      }

      if (success) {
        toast({
          title: "Success!",
          description: editingRecord ? "Record updated successfully" : "New record added successfully"
        });
        
        if (!editingRecord) {
          setFormData({ name: '', email: '', notes: '' });
        }
        onSuccess?.();
      } else {
        toast({
          title: "Error",
          description: "Failed to save record. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {editingRecord ? <Save className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
          <span>{editingRecord ? 'Edit Contact' : 'Add New Contact'}</span>
        </CardTitle>
        <CardDescription>
          {editingRecord ? 'Update the contact information and notes' : 'Record information about someone you spoke with while canvassing'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter person's name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Conversation Notes *</Label>
            <Textarea
              id="notes"
              placeholder="What did you discuss? What are their main concerns? Any follow-up needed?"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className={`min-h-32 ${errors.notes ? 'border-red-500' : ''}`}
            />
            {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
            <p className="text-sm text-gray-500">
              Include key topics discussed, voter concerns, follow-up actions needed, etc.
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1 md:flex-none">
              {isSubmitting ? 'Saving...' : (editingRecord ? 'Update Record' : 'Save Record')}
            </Button>
            {editingRecord && (
              <Button type="button" variant="outline" onClick={onSuccess}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
