package jobdetails.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Previousjobs.
 */
@Entity
@Table(name = "previousjobs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Previousjobs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Company company;

    @ManyToOne
    private Title title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public Previousjobs student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Company getCompany() {
        return company;
    }

    public Previousjobs company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Title getTitle() {
        return title;
    }

    public Previousjobs title(Title title) {
        this.title = title;
        return this;
    }

    public void setTitle(Title title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Previousjobs previousjobs = (Previousjobs) o;
        if (previousjobs.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, previousjobs.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Previousjobs{" +
            "id=" + id +
            '}';
    }
}
