import './Notification.css'

const Notification = ({message, error}) => {
    if(message != null && message.length > 0) {
        return(
            <div className={error ? 'notification-negative' : 'notification-positive'}>
                <span>{message}</span>
            </div>
        )
    }
}

export default Notification