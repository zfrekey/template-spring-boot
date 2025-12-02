package com.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserReportDTO {

    private String name;
    private String cpf;
    private String nascimento;   // dd/MM/yyyy
    private String sexo;         // "MASCULINO", "FEMININO", etc.
    private String createdDate;  // dd/MM/yyyy
}
