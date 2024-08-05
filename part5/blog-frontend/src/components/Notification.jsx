import PropTypes from 'prop-types'

const Notification = ({ message, error }) => {
    let classnames = 'notification '

    if (error) {
        classnames += ' error'
    }
    else {
        classnames += ' positive'
    }

    if (message !== null) {
        return (
            <div className={classnames}>{message}</div>
        )
    }
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
}


export default Notification