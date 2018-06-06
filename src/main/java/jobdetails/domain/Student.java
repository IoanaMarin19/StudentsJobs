package jobdetails.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nume", nullable = false)
    private String nume;

    @NotNull
    @Column(name = "prenume", nullable = false)
    private String prenume;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

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

    public String getNume() {
        return nume;
    }

    public Student nume(String nume) {
        this.nume = nume;
        return this;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPrenume() {
        return prenume;
    }

    public Student prenume(String prenume) {
        this.prenume = prenume;
        return this;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getEmail() {
        return email;
    }

    public Student email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Company getCompany() {
        return company;
    }

    public Student company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Title getTitle() {
        return title;
    }

    public Student title(Title title) {
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
        Student student = (Student) o;
        if (student.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, student.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + id +
            ", nume='" + nume + "'" +
            ", prenume='" + prenume + "'" +
            ", email='" + email + "'" +
            '}';
    }
}
