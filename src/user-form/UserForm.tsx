import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'
import styles from './style.module.css'
import Button from '../components/Button'

interface UserFormData {
  name: string
  email: string
  role: 'admin' | 'user'
}

const UserForm = () => {
  const [form, setForm] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'user',
  })
  const [submitted, setSubmitted] = useState<UserFormData | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitted(form)
    setForm({
      name: '',
      email: '',
      role: 'user',
    })
  }

  return (
    <div>
      <h1 className={styles.title}>Create User</h1>

      <div className={styles.formContaier}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor='name' className={styles.label}>
              Name
            </label>
            <input
              type='text'
              className={styles.formControl}
              id='name'
              name='name'
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='email' className={styles.label}>
              Email
            </label>
            <input
              type='text'
              className={styles.formControl}
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='role' className={styles.label}>
              Role
            </label>
            <select
              className={styles.formControl}
              id='role'
              name='role'
              value={form.role}
              onChange={handleChange}
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <Button
              type='submit'
              variant='secondary'
              className={styles.submitBtn}
            >
              Create User
            </Button>
          </div>
        </form>

        {submitted && (
          <section className={styles.submittedUser}>
            <h2>Submitted User</h2>
            <p>Name: {submitted.name}</p>
            <p>Email: {submitted.email}</p>
            <p>
              Role: <strong>{submitted.role}</strong>
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

export default UserForm
