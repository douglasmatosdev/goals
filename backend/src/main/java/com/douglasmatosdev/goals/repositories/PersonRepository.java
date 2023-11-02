package com.douglasmatosdev.repositories;

import com.douglasmatosdev.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
