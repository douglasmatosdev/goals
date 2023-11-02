package com.douglasmatosdev.goals.repositories;

import com.douglasmatosdev.goals.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
