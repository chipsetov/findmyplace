package ua.softserve.rv036.findmeplace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.softserve.rv036.findmeplace.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}