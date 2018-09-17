package ua.softserve.rv036.findmeplace.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"registrationDate", "lastUpdateDate"},
        allowGetters = true
)
@Data
public abstract class DateAudit implements Serializable {

    @CreatedDate
    @Column(nullable = false, updatable = false, name = "registration_date")
    private Instant registrationDate;

    @LastModifiedDate
    @Column(nullable = false,name = "last_update_date")
    private Instant lastUpdateDate;

}