package com.crud.config;

import com.crud.entity.UserEntity;
import com.crud.entity.enums.Sexo;
import com.crud.repositories.UserRepository;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Locale;

@Configuration
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) {

        System.out.println("🔄 Executando seed aleatório (20 usuários)...");

        // evita rodar seed se o banco já tiver dados
        if (userRepository.count() > 0) {
            System.out.println("⏩ Seed ignorado — banco já possui dados.");
            return;
        }

        Faker faker = new Faker(new Locale("pt", "BR"));

        for (int i = 0; i < 20; i++) {

            String name = faker.name().fullName();

            // CPF com 11 dígitos numéricos
            String cpf = faker.number().digits(11);

            // nascimento aleatório entre 18 e 60 anos
            LocalDate nascimento = LocalDate.now()
                    .minusYears(faker.number().numberBetween(18, 60))
                    .minusDays(faker.number().numberBetween(0, 365));

            // enum Sexo aleatório
            Sexo sexo = faker.options().option(Sexo.MASCULINO, Sexo.FEMININO);

            // data/hora de criação aleatória nos últimos 30 dias
            LocalDateTime createdDate = LocalDateTime.now()
                    .minusDays(faker.number().numberBetween(0, 30))
                    .minusHours(faker.number().numberBetween(0, 23))
                    .minusMinutes(faker.number().numberBetween(0, 59))
                    .minusSeconds(faker.number().numberBetween(0, 59));

            UserEntity user = new UserEntity();
            user.setName(name);
            user.setCpf(cpf);
            user.setNascimento(nascimento);
            user.setSexo(sexo);
            // ajuste o nome do campo se na sua entidade não for "createdDate"
            user.setCreatedDate(createdDate);

            userRepository.save(user);
        }

        System.out.println("✅ Seed concluído com sucesso — 20 usuários gerados!");
    }
}
