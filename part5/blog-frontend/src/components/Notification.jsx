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
    error: PropTypes.bool.isRequired
}


export default Notification