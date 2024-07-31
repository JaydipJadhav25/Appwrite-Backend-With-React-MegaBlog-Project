import {useCallback, useEffect}  from 'react'
import { Input , Button , RTE , Select} from "../index"
import { useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom' 
import { useForm } from 'react-hook-form'
import appwriteService from '../../Appwriter/config'


const PostForm = async({post}) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector(s => s.auth.userData);

    console.log("userdata: " , userData)


    const submit = async(data) =>{
      //post in all ready present
      if(post){
        //file geu and upload
        const file = data.featuredImage[0] ? appwriteService.uploadFile(data.featuredImage[0]) : null
        
        //delete old file image
        if(file){
          appwriteService.deletefile(post.featuredImage)
        } 

        //to create new post
        
        const dbPost = await appwriteService.updatePost(post.$id ,{
          ...data,
          featuredImage : file ? file.$id : undefined
        })
         //redirect
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      } else {
        const file = await appwriteService.uploadFile(data.Image[0]);

        if(file){
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appwriteService.createPost({...data,
            userid : userData.$id
          });
          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }
        }

      }
    };

    //to create slug
    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
          return value
              .trim()
              .toLowerCase()
              .replace(/[^a-zA-Z\d\s]+/g, "-")
              .replace(/\s/g, "-");

      return "";
  }, []);


  useEffect(() => {
    const subscription = watch((value, { name }) => {
      //check
        if (name === "title") {
          //setvalue slug
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        } 
    });

    //disallocate value
    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);





  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  );
}

export default PostForm;