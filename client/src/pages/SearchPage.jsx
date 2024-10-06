import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

function SearchPage() {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const location = useLocation();
  const navigateTo = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const HandleChange = (e) => {
    setSearchData({ ...searchData, [e.target.id]: e.target.value });
  };
  const HandleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("sort", searchData.sort);
    urlParams.set("category", searchData.category);
    const searchQuery = urlParams.toString()
    navigateTo(`/search?${searchQuery}`)
  }
  const HandleShowMore = async () => {
    const totalPosts = posts.length
    const startIndex = totalPosts;
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex',startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/posts/getposts?${searchQuery}`)
    const data = await res.json()
    if (!res.ok) {
      return
    }
    setPosts((prevPosts) => [...prevPosts,...data.posts]);
    if(posts.length === 9) {
      setShowMore(true)
    }
    else{
      setShowMore(false)
    }
  }

  // console.log(searchData);
  // console.log(posts);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sort = urlParams.get("sort");
    const category = urlParams.get("category");
    if (searchTermFromUrl) {
      setSearchData({
        ...searchData,
        searchTerm: searchTermFromUrl,
        sort: sort?sort:'desc',
        category: category?category:'uncategorized'
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const response = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!response.ok) {
        setLoading(false);
        console.log("Error!");
      }
      const data = await response.json();
      setPosts(data.posts);
      setLoading(false);
      setShowMore(data.posts.length >= 9); // show show more button if there are more than 10 posts
    };
    fetchPosts();
  }, [location.search]);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-teal-500">
        <form className="flex flex-col gap-8" onSubmit={HandleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Keyword:</label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={searchData.searchTerm}
              onChange={HandleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort By:</label>
            <Select className="w-full cursor-pointer" onChange={HandleChange} value={searchData.sort} id="sort" >
              <option value={'asc'}>Latest</option>
              <option value={'desc'}>Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select className="w-full cursor-pointer" onChange={HandleChange} value={searchData.category} id="category" >
              <option value={'uncategorized'}>uncategorized</option>
              <option value={'React'}>React</option>
              <option value="Javascript">Javascript</option>
              <option value="Database">Database</option>
              <option value="MongoDb">MongoDb</option>
            </Select>
          </div>

          <Button type="submit" outline gradientDuoTone={'purpleToPink'}>
              Search
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center p-3 mt-5">Requested Posts</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {
            !loading && posts.length === 0 && <p className="text-xl text-gray-500">
              No posts found. Please try a different search
            </p>
          }
          {
            loading && <p className="text-xl text-gray-500 text-center">Loading...</p>
          }
          {
            !loading && posts && posts.map((post)=>{
              return <PostCard key={post._id} post={post}/>
            })
          }
          {
            showMore && <Button className="text-lg text-teal-500 p-7 text-center w-full hover:underline " onClick={HandleShowMore}>Show More</Button>
          }
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
