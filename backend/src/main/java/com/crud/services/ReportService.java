package com.crud.services;

import com.crud.dto.UserReportDTO;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final UserService userService;

    public byte[] generateUsersPdfReport() throws JRException {

        List<UserReportDTO> users = userService.listAllUsersForReport();
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(users);

        InputStream reportStream = getClass().getResourceAsStream("/reports/users_report.jrxml");
        if (reportStream == null) {
            throw new RuntimeException("Arquivo de relatório não encontrado: /reports/users_report.jrxml");
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        Map<String, Object> params = new HashMap<>();
        params.put("REPORT_TITLE", "Relatório de Usuários");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
