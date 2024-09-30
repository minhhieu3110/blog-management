import {useContext, useState} from "react";
import useListBlog from "../Custom/hooks/useListBlog";
import {useNavigate} from "react-router-dom";
import {MyContext} from "../MyContext";

export default function Search() {
    const { listBlog } = useListBlog('http://localhost:3000/posts');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOptions, setSearchOptions] = useState('All');
    const { setShowSearch, setSearchResults } = useContext(MyContext);
    const navigate = useNavigate();
    
    const publicPosts = listBlog.filter((post) => post.status === 'public');
    
    const handleSearch = () => {
        const filterPost = publicPosts.filter((post) => {
            if (searchOptions === 'All') {
                return (
                    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.type.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (searchOptions === 'Title') {
                return post.title.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchOptions === 'Content') {
                return post.content.toLowerCase().includes(searchTerm.toLowerCase());
            }else if (searchOptions === 'Types') {
                return post.type.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false;
        });
        setSearchResults(filterPost);
        setShowSearch(false);
        navigate('/search')
    };
    return (
        <div className='search-container'>
            <div className='search-form'>
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
                        <option value='Types'>Types</option>
                    </select>
                </div>
                <button className='submit' onClick={handleSearch}>Tìm kiếm</button>
            </div>
        </div>
    );
}
