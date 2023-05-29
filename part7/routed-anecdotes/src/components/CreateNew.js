import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useField} from "../hooks";

const CreateNew = (props) => {const navigate = useNavigate()
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
    }

    const handleReset = () =>{
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input  name='content' value={content.value} onChange={content.onChange} />
                </div>
                <div>
                    author
                    <input name='author' value={author.value} onChange={author.onChange} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={info.value} onChange={info.onChange} />
                </div>
                <button type="submit">create</button>
                <button type="reset" onClick={handleReset} >reset</button>
            </form>
        </div>
    )

}

export default CreateNew