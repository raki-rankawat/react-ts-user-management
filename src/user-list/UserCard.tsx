import Button from '../components/Button'
import styles from './style.module.css'
import type { User } from './types'

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
  onDelete: (id: number) => void
}

const UserCard = ({ user, onSelect, onDelete }: UserCardProps) => {
  const { id, name, email, role } = user

  return (
    <div className={styles.userCard}>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>
        Role: <strong>{role}</strong>
      </p>

      <div className={styles.btnGroup}>
        <Button
          variant='primary'
          children='Select User'
          onClick={() => onSelect(user)}
        />
        <Button
          variant='danger'
          children='Delete'
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  )
}

export default UserCard
