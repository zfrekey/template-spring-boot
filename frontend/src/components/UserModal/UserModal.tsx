'use client';

import { useState } from 'react';
import { z } from 'zod';
import styles from './styles.module.css';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import { usePostUsers } from '@/hooks/usePostUsers';
import { userSchema, UserData, Gender } from '@/types/user';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: () => void;
  mode?: 'create' | 'edit';
  initialData?: UserData;
}

export default function UserModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  onError, 
  mode = 'create',
  initialData 
}: UserModalProps) {
  const [formData, setFormData] = useState<UserData>(
    initialData || {
      name: '',
      cpf: '',
      birthDate: '',
      gender: '' as Gender
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { postUser, isLoading } = usePostUsers();

  const isEditMode = mode === 'edit';

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = userSchema.parse(formData);
      setErrors({});
      
      await postUser(validatedData);
      
      setFormData({ name: '', cpf: '', birthDate: '', gender: '' as Gender });
      onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setErrors(newErrors);
      } else {
        onError();
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', cpf: '', birthDate: '', gender: '' as Gender });
    setErrors({});
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>
          {isEditMode ? 'Editar Usuário' : 'Criar Novo Usuário'}
        </h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id="name"
            label="Nome"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            error={errors.name}
            required
          />

          <Input
            id="cpf"
            label="CPF"
            value={formData.cpf}
            onChange={(value) => setFormData({ ...formData, cpf: value })}
            placeholder="000.000.000-00"
            error={errors.cpf}
            disabled={isEditMode}
            required
          />

          <Input
            id="birthDate"
            label="Data de Nascimento"
            type="date"
            value={formData.birthDate}
            onChange={(value) => setFormData({ ...formData, birthDate: value })}
            error={errors.birthDate}
            required
          />

          <Select
            id="gender"
            label="Sexo"
            value={formData.gender}
            onChange={(value) => setFormData({ ...formData, gender: value as Gender })}
            options={[
              { value: 'M', label: 'Masculino' },
              { value: 'F', label: 'Feminino' }
            ]}
            error={errors.gender}
            required
          />

          <div className={styles.actions}>
            <button type="button" onClick={handleCancel} className={styles.cancelButton} disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading 
                ? (isEditMode ? 'Salvando...' : 'Criando...') 
                : (isEditMode ? 'Salvar' : 'Adicionar')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
