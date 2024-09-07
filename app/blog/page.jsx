import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "How MaaDiy is Revolutionizing Marketing",
      summary: "Learn how MaaDiy can help you connect with customers and drive business results through direct messaging and analytics.",
      slug: "revolutionizing-marketing",
      date: "September 10, 2023"
    },
    {
      id: 2,
      title: "Best Practices for Increasing Open Rates",
      summary: "Discover tips and strategies to improve your message open rates and engagement with customers.",
      slug: "increasing-open-rates",
      date: "August 30, 2023"
    },
    {
      id: 3,
      title: "Analyzing Campaign Performance with MaaDiy",
      summary: "Learn how to track the success of your marketing campaigns using MaaDiy's advanced analytics.",
      slug: "analyzing-campaign-performance",
      date: "July 15, 2023"
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Blog</h1>
        <p className="mb-8">Stay updated with the latest news, tips, and insights from MaaDiy.</p>

        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <p className="text-gray-400 text-sm">{post.date}</p>
              <Link href={`/blog/${post.slug}`}>
                <span className="text-blue-500 hover:underline mt-4 inline-block">
                  Read more &rarr;
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}