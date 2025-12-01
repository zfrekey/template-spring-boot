import Image from 'next/image';

interface IconProps {
  size?: number;
}

export function EditIcon({ size = 16 }: IconProps) {
  return (
    <Image 
      src="/icons/edit.svg" 
      alt="Editar" 
      width={size} 
      height={size}
      style={{ display: 'block' }}
    />
  );
}

export function DeleteIcon({ size = 16 }: IconProps) {
  return (
    <Image 
      src="/icons/delete.svg" 
      alt="Deletar" 
      width={size} 
      height={size}
      style={{ display: 'block' }}
    />
  );
}
