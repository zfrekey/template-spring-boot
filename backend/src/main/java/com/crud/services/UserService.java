package com.crud.services;

import com.crud.dto.UserCreateDTO;
import com.crud.dto.UserEditDTO;
import com.crud.dto.UserReportDTO;
import com.crud.dto.UserResponseDTO;
import com.crud.entity.UserEntity;
import com.crud.exceptions.CpfJaCadastradoException;
import com.crud.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private UserResponseDTO toResponseDTO(UserEntity user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getCpf(),
                user.getNascimento(),
                user.getSexo()
        );
    }

    public UserResponseDTO createUser(UserCreateDTO userDTO) {
        UserEntity user = new UserEntity();
        user.setName(userDTO.getName());
        user.setCpf(userDTO.getCpf());
        user.setNascimento(userDTO.getNascimento());
        user.setSexo(userDTO.getSexo());

        try {
            UserEntity saved = userRepository.save(user);
            return toResponseDTO(saved);
        } catch (DataIntegrityViolationException e) {
            throw new CpfJaCadastradoException("CPF já cadastrado");
        }
    }

    public Page<UserResponseDTO> listAllUsersPaginated(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::toResponseDTO);
    }

    public List<UserReportDTO> listAllUsersForReport() {
        DateTimeFormatter nascimentoFmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter createdFmt   = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        return userRepository
                .findAll(Sort.by(Sort.Direction.ASC, "createdDate"))
                .stream()
                .map(user -> new UserReportDTO(
                        user.getName(),
                        user.getCpf(),
                        user.getNascimento() != null
                                ? user.getNascimento().format(nascimentoFmt)
                                : "",
                        user.getSexo() != null
                                ? user.getSexo().name()
                                : "",
                        user.getCreatedDate() != null
                                ? user.getCreatedDate().format(createdFmt)
                                : ""
                ))
                .toList();
    }

    public Page<UserResponseDTO> searchUsersPaginated(String query, Pageable pageable) {

        if (query == null || query.trim().isEmpty()) {
            return userRepository.findAll(pageable)
                    .map(this::toResponseDTO);
        }

        String trimmed = query.trim();
        String onlyDigits = trimmed.replaceAll("\\D", "");

        return userRepository
                .searchByNameOrCpf(trimmed, onlyDigits, pageable)
                .map(this::toResponseDTO);
    }

    public void deleteById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        userRepository.deleteById(id);
    }

    public UserResponseDTO editUser(Long id, UserEditDTO dto) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (dto.getName() != null) {
            user.setName(dto.getName());
        }
        if (dto.getNascimento() != null) {
            user.setNascimento(dto.getNascimento());
        }
        if (dto.getSexo() != null) {
            user.setSexo(dto.getSexo());
        }

        UserEntity updated = userRepository.save(user);
        return toResponseDTO(updated);
    }
}
