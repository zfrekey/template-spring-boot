package com.crud.repositories;

import com.crud.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Page<UserEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Optional<UserEntity> findByCpf(String cpf);

    @Query(
            "SELECT u FROM UserEntity u " +
                    "WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
                    "   OR (:onlyDigits <> '' AND u.cpf LIKE CONCAT('%', :onlyDigits, '%'))"
    )
    Page<UserEntity> searchByNameOrCpf(
            @Param("query") String query,
            @Param("onlyDigits") String onlyDigits,
            Pageable pageable
    );
}
