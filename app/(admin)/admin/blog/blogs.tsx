"use client";
import { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  LinkIcon,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "@/actions/actions";
import Image from "next/image";
import { Pagination } from "@/components/ui/pagination";

interface BlogPageProps {
  initialBlogs: {
    data: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export default function BlogPage({ initialBlogs }: BlogPageProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [posts, setPosts] = useState(
    initialBlogs.data.map((post) => ({ ...post, isCollapsed: true }))
  );
  const [resource, setResource] = useState();
  const [currentPage, setCurrentPage] = useState(initialBlogs.pagination.page);
  const [totalPages, setTotalPages] = useState(
    initialBlogs.pagination.totalPages
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleCreateNewBlog = () => {
    setShowEditor(true);
    setEditingPost(null);
  };

  const handleEditBlog = (post) => {
    setShowEditor(true);
    setTitle(post.title);
    setContent(post.content);
    setEditingPost(post);
  };

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  const handleDeleteBlog = async (postId) => {
    try {
      await deleteBlog(postId);
      // Refetch the current page
      handlePageChange(currentPage);
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = {
      title,
      content,
      blogImage: resource?.secure_url,
    };

    try {
      if (editingPost) {
        const updatedBlog = await updateBlog(editingPost.id, blogData);
        const updatedPosts = posts.map((post) =>
          post.id === editingPost.id ? updatedBlog : post
        );
        if (updatedBlog) {
          toast.success("Blog updated successfully");

          setPosts(updatedPosts);
        } else {
          toast.error("Failed to update blog");
        }
      } else {
        const newBlog = await createBlog(blogData);
        if (newBlog) {
          toast.success("Blog created successfully");
        } else {
          toast.error("Failed to create blog");
        }
        setPosts([newBlog, ...posts]);
      }

      // Reset pagination and fetch the first page
      handlePageChange(1);

      setTitle("");
      editor?.commands.setContent("");
      setShowEditor(false);
      setEditingPost(null);
    } catch (error) {
      console.error("Failed to save blog:", error);
    }
  };

  const toggleContentVisibility = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isCollapsed: !post.isCollapsed } : post
      )
    );
  };

  const handlePageChange = async (page: number) => {
    try {
      const response = await getBlogs({
        page,
        limit: 10,
      });
      setPosts(response.data.map((post) => ({ ...post, isCollapsed: true })));
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Manage Your Blogs</h1>

      {/* Get Started Section */}
      {!showEditor && (
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">Start Creating Your Blog!</h2>
          <p className="text-sm mt-2 text-blue-100 text-center">
            Share your thoughts, tips, and stories with the world. Click the
            button below to start writing your first blog post.
          </p>
          <button
            onClick={handleCreateNewBlog}
            className="mt-4 bg-white text-blue-600 hover:text-blue-800 font-semibold px-6 py-3 rounded-full shadow-md flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Blog
          </button>
        </div>
      )}

      {/* Blog Editor Section */}
      {showEditor && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Image
            </label>
            <CldUploadWidget
              uploadPreset="testing"
              onSuccess={(result, { widget }) => {
                setResource(result?.info);
              }}
              onQueuesEnd={(result, { widget }) => {
                widget.close();
              }}
              options={{
                sources: ["local", "url", "unsplash"],
                multiple: true,
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setResource(undefined);
                  open();
                }

                return (
                  <button
                    onClick={handleOnClick}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm flex items-center"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Upload an Image
                  </button>
                );
              }}
            </CldUploadWidget>
            {resource && (
              <div className="mt-4">
                <img
                  src={resource.secure_url}
                  alt="Uploaded blog image"
                  className="max-w-full h-auto rounded-md shadow-sm"
                />
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {editingPost ? "Edit Blog" : "Create New Blog"}
          </h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter a catchy title for your blog"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <div className="border rounded-md shadow-sm p-2">
              <div className="flex space-x-2 mb-2">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`p-2 ${
                    editor?.isActive("bold")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <Bold className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-2 ${
                    editor?.isActive("italic")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <Italic className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  className={`p-2 ${
                    editor?.isActive("underline")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <UnderlineIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  className={`p-2 ${
                    editor?.isActive("bulletList")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter the URL:");
                    if (url)
                      editor?.chain().focus().setLink({ href: url }).run();
                  }}
                  className={`p-2 ${
                    editor?.isActive("link")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <LinkIcon className="h-5 w-5" />
                </button>
              </div>
              <EditorContent editor={editor} />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {editingPost ? "Update Blog" : "Publish Blog"}
          </button>
        </form>
      )}

      {/* View Available Blogs */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Available Blogs</h2>
        <ul className="space-y-4 mt-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-600">
                  {post.title}
                </h3>
                {post.blogImage && (
                  <div className="mt-2">
                    <Image
                      src={post.blogImage}
                      alt={`Image for ${post.title}`}
                      width={200}
                      height={150}
                      className="rounded-md shadow-sm object-cover"
                    />
                  </div>
                )}
                {post.isCollapsed ? (
                  <div className="text-gray-600">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.substring(0, 150) + "...",
                      }}
                      className="ProseMirror"
                    />
                    <button
                      onClick={() => toggleContentVisibility(post.id)}
                      className="text-blue-500 ml-2 underline"
                    >
                      Read More
                    </button>
                  </div>
                ) : (
                  <div>
                    <div
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      className="ProseMirror"
                    />
                    <button
                      onClick={() => toggleContentVisibility(post.id)}
                      className="text-blue-500 mt-2 underline"
                    >
                      Show Less
                    </button>
                  </div>
                )}{" "}
                <p className="text-gray-400 text-xs mt-2">
                  Published on {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditBlog(post)}
                  className="bg-yellow-500 text-white p-2 rounded-md"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteBlog(post.id)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
