'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import styles from './styles.module.css';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import { usePostUsers } from '@/hooks/usePostUsers';
import { useEditUser } from '@/hooks/useEditUser';
import { userCreateSchema, userEditSchema, UserCreate, UserResponse, Gender } from '@/types/user';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
  mode?: 'create' | 'edit';
  initialData?: UserResponse;
}

export default function UserModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  onError, 
  mode = 'create',
  initialData 
}: UserModalProps) {
  const [formData, setFormData] = useState<UserCreate>({
    name: '',
    cpf: '',
    nascimento: '',
    sexo: '' as Gender
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { postUser, isLoading: isCreating } = usePostUsers();
  const { editUser, isLoading: isEditing } = useEditUser();

  const isEditMode = mode === 'edit';
  const isLoading = isCreating || isEditing;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', cpf: '', nascimento: '', sexo: '' as Gender });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setErrors({});
      
      if (isEditMode && initialData && 'id' in initialData) {
        const validatedEditData = userEditSchema.parse({
          name: formData.name,
          nascimento: formData.nascimento,
          sexo: formData.sexo
        });
        await editUser(initialData.id, validatedEditData);
      } else {
        const validatedCreateData = userCreateSchema.parse(formData);
        await postUser(validatedCreateData);
      }
      
      setFormData({ name: '', cpf: '', nascimento: '', sexo: '' as Gender });
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
        let errorMessage = 'Erro ao processar requisição';
        
        if ((error as any)?.response?.data) {
          const data = (error as any).response.data;
          errorMessage = data.message || data.error || data || errorMessage;
        }
        
        onError(errorMessage);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', cpf: '', nascimento: '', sexo: '' as Gender });
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

          <div>
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
            {isEditMode && (
              <p className={styles.helperText}>
                O CPF não pode ser alterado
              </p>
            )}
          </div>

          <Input
            id="nascimento"
            label="Data de Nascimento"
            type="date"
            value={formData.nascimento}
            onChange={(value) => setFormData({ ...formData, nascimento: value })}
            error={errors.nascimento}
            required
          />

          <Select
            id="sexo"
            label="Sexo"
            value={formData.sexo}
            onChange={(value) => setFormData({ ...formData, sexo: value as Gender })}
            options={[
              { value: 'MASCULINO', label: 'Masculino' },
              { value: 'FEMININO', label: 'Feminino' }
            ]}
            error={errors.sexo}
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
