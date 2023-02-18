import { useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const default_image = process.env.REACT_APP_DEFAULT_IMAGE

const AddBlog = (props) => {

    let { user } = props

    // blog image

    let imageURL = useRef()
    let imagePlace = useRef()

    function changeImage(e) {
        e.preventDefault()
        let image = document.createElement('img')
        image.onload = () => {
            imagePlace.current.src = e.target.value
        }
        image.src = e.target.value
    }
    function focusout(e) {
        let image = document.createElement('img')
        image.onerror = () => {
            imageURL.current.value = imagePlace.current.src
        }
        image.src = imageURL.current.value
    }
    useEffect(() => {
        let url = imageURL.current,
            place = imagePlace.current
        if (!url || !place)
            return

        place.onerror = () => {
            place.src = default_image
        }

        url.addEventListener('input', changeImage)
        url.addEventListener('focusout', focusout)

        return () => {
            if (!url || !place)
                return
            url.removeEventListener('input', changeImage)
            url.removeEventListener('focusout', focusout)
        }
    }, [imageURL, imagePlace])


    // richtext


    return (
        <>
            <form className="blog-form" action="">
                <div className="blogs blog">
                    <div style={{ textAlign: "center" }}>
                        <input type="text" name="image" className="h" placeholder="Image URL|" required
                            style={{ margin: 0 }} ref={imageURL} />
                        <img alt="username" className="image" name="img"
                            src={default_image} ref={imagePlace} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <input type="text" name="title" className="h" placeholder="Title|" required />
                        <p className="gray-color">{user?.username || 'username'}</p>
                    </div>
                    <ReactQuill theme="snow" />
                </div>
            </form>
        </>
    );
}

export default AddBlog;