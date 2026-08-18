import styles from './style.module.css'
import type { User } from './types'

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
}

const UserCard = ({ user, onSelect }: UserCardProps) => {
  const { name, email, role } = user

  return (
    <div className={styles.userCard}>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>
        Role: <strong>{role}</strong>
      </p>

      <button className={styles.btn} onClick={() => onSelect(user)}>
        Select User
      </button>
    </div>
  )
}

export default UserCard
