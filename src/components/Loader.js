import style from './Loader.module.css'
function Loader() {
    return (
        <div className={style.loader}>
            <div className={style.popcorn} >🍿</div>
        </div>
    )
}

export default Loader;