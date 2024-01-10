import { BASE_URL } from "./base_URL";
import { commonAPI } from "./common_API";

// register API Call
export const registerAPI=async(reqBody)=>{

    return await commonAPI("post",`${BASE_URL}/user/register`,reqBody,"")
}
// login API
export const loginAPI=async(reqBody)=>{
    return await commonAPI("post", `${BASE_URL}/user/login`,reqBody,"")
}

// getuserprofile API
export const getuserprofileAPI=async(reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/user/profile`,"",reqHeader)
}
// get Bloger profile API
export const getBloggerProfileAPI=async(id,reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/user/blogger/${id}`,"",reqHeader)
}

// update userprofile API
export const updateUserAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("put",`${BASE_URL}/user/update`,reqBody,reqHeader)
}
// all getuserprofile API
export const getAllBloggersAPI=async(reqHeader)=>{
    return await commonAPI("get",`${BASE_URL}/user/all`,"",reqHeader)
}

// get blogger Blogs
export const getBlogerBlogsAPI=async(id,reqHeader)=>{
    return await commonAPI("get", `${BASE_URL}/blog/blogerblogs/${id}`,"",reqHeader)
}
// get homeblog API
export const homeBlogAPI=async()=>{
    return await commonAPI("get", `${BASE_URL}/blog/homebolg`,"","")
}
// get all blogs

export const getAllBlogsAPI=async(searchkey,reqHeader)=>{
    return await commonAPI("get", `${BASE_URL}/blog/allbolg?search=${searchkey}`,"",reqHeader)
}

export const getUserBlogsAPI=async(reqHeader)=>{
    return await commonAPI("get", `${BASE_URL}/blog/userbolg`,"",reqHeader)
}
// get A particular user blog
export const getParticularUserBlogAPI=async(id,reqHeader)=>{
    return await commonAPI("get", `${BASE_URL}/blog/particulablog/${id}`,"",reqHeader)
}

// get single blog
export const getSingleBlogAPI=async(id,reqHeader)=>{
    return await commonAPI("get", `${BASE_URL}/blog/singleblog/${id}`,"",reqHeader)
}

// add Blog
export const addBlogAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${BASE_URL}/blog/add`,reqBody,reqHeader)
}
// update Blog
export const updateBlogAPI=async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${BASE_URL}/blog/update/${id}`,reqBody,reqHeader)
}
// update Blog
export const deleteBlogAPI=async(id,reqHeader)=>{
    return await commonAPI("delete",`${BASE_URL}/blog/delete/${id}`,"",reqHeader)
}
// view review
export const getReviewBlogsAPI=async(id,reqHeader)=>{
    return await commonAPI("get", `${BASE_URL}/review/view/${id}`,"",reqHeader)
}
// Add  review
export const addReviewBlogsAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post", `${BASE_URL}/review/add`,reqBody,reqHeader)
}

// delete review

export const deleteReviewBlogsAPI=async(id,reqHeader)=>{
    return await commonAPI("delete", `${BASE_URL}/review/delete/${id}`,"",reqHeader)
}

// delete  Profile
export const deleteProfileAPI=async(_id,reqHeader)=>{
    return await commonAPI("delete",`${BASE_URL}/user/delete/${_id}`,"",reqHeader)
}

// delete  user Blogs
export const deleteUserBlogsAPI=async(_id,reqHeader)=>{
    return await commonAPI("delete",`${BASE_URL}/blog/deleteall/${_id}`,"",reqHeader)
}

// delete  user review
export const deleteUserReviewAPI=async(_id,reqHeader)=>{
    return await commonAPI("delete",`${BASE_URL}/review/deleteall/${_id}`,"",reqHeader)
}

