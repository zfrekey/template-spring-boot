package com.crud.controllers;

import com.crud.dto.UserCreateDTO;
import com.crud.dto.UserEditDTO;
import com.crud.dto.UserResponseDTO;
import com.crud.services.ReportService;
import com.crud.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ReportService reportService;

    @PostMapping
    public UserResponseDTO createUser(@Valid @RequestBody UserCreateDTO userDTO) {
        return userService.createUser(userDTO);
    }

    @GetMapping("/paginated")
    public Page<UserResponseDTO> listUsersPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String query
    ) {
        Pageable pageable = PageRequest.of(page, size);

        if (query == null || query.isBlank()) {
            return userService.listAllUsersPaginated(pageable);
        }

        return userService.searchUsersPaginated(query, pageable);
    }

    @GetMapping("/reports")
    public ResponseEntity<byte[]> usersReport() throws Exception {
        byte[] pdf = reportService.generateUsersPdfReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "usuarios.pdf");

        return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteById(id);
    }

    @PatchMapping("/{id}")
    public UserResponseDTO editUser(@PathVariable Long id, @RequestBody UserEditDTO dto) {
        return userService.editUser(id, dto);
    }
}
