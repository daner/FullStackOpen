const Notification = ({message, error}) => {
    let classnames = 'notification '

    console.log({message, error})

    if(error) {
        classnames += ' error'
    }
    else {
        classnames += ' positive'
    }
    
    if(message !== null) {
        return(
            <div className={classnames}>{message}</div>
        )
    }
}

export default Notification