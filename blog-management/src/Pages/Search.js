import {useContext, useState} from "react";
import useListBlog from "../Custom/hooks/useListBlog";
import {useNavigate} from "react-router-dom";
import ResultSearch from "./ResultSearch";
import {MyContext} from "../MyContext";

export default function Search() {
    const { listBlog} = useListBlog('http://localhost:3000/posts');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOptions, setSearchOptions] = useState('All')
    const {setSearchResults, setShowSearch} = useContext(MyContext)
    const navigate = useNavigate();
    const handleSearch = (e) =>{
        e.preventDefault()
        const filterPost = listBlog.filter((post) => {
            if (searchOptions === 'All') {
                return (
                    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (searchOptions === 'Title') {
                return post.title.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchOptions === 'Content') {
                return post.content.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false;
        });
        setSearchResults(filterPost)
        console.log(filterPost)
        setShowSearch(false)
        navigate('/search');
    }
    return (
        <div className='search-container'>
            <form className='search-form' onSubmit={handleSearch}>
                <label htmlFor="searchTerm">Tìm Kiếm</label>
                <div className="content-search-term">
                    <input
                        type='text'
                        value={searchTerm}
                        id='searchTerm'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Nhập từ khóa tìm kiếm ...'
                    />
                    <select className='searchOptions' value={searchOptions}
                            onChange={e => setSearchOptions(e.target.value)}>
                        <option value='All'>Tất cả</option>
                        <option value='Title'>Tiêu đề</option>
                        <option value='Content'>Nội dung</option>
                    </select>
                </div>
                <button className='submit' type={"submit"}>Tìm kiếm</button>
            </form>
        </div>
    )
}