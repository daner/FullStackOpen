import { useSelector } from 'react-redux'

const Notification = () => {

    const notification = useSelector(state => state.notification)

    let classnames = 'notification '

    if (notification.error) {
        classnames += ' error'
    } else {
        classnames += ' positive'
    }

    if (notification.show) {
        return (
            <div className={classnames} data-testid="notification">
                {notification.message}
            </div>
        )
    }
}

export default Notification
