import Link from 'next/link'
import { Users, FileText, MessageSquare } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link href="/admin/students" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Students</h2>
          <Users className="h-8 w-8 text-blue-500" />
        </div>
        <p className="mt-2 text-gray-600">Manage student registrations and information</p>
      </Link>
      <Link href="/admin/blog" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Blog</h2>
          <FileText className="h-8 w-8 text-green-500" />
        </div>
        <p className="mt-2 text-gray-600">Create and manage blog posts</p>
      </Link>
      <Link href="/admin/testimonials" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Testimonials</h2>
          <MessageSquare className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="mt-2 text-gray-600">Manage student testimonials</p>
      </Link>
    </div>
  )
}

