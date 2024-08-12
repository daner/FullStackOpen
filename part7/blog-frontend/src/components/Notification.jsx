import { useSelector } from 'react-redux'

const Notification = () => {

    const notification = useSelector(state => state.notification)

    let classnames = 'mb-4 px-4 py-2 border-2 bg-gray-200 '

    if (notification.error) {
        classnames += ' text-red-500 border-red-600'
    } else {
        classnames += ' text-green-700 border-green-700'
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
