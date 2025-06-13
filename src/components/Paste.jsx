import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-5">
          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search pastes by title..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* All Pastes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">
                All Pastes ({filteredPastes.length})
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredPastes.length > 0 ? (
                filteredPastes.map((paste) => (
                  <div
                    key={paste?._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Content Section */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                          {paste?.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {paste?.content}
                        </p></div>
                        <div className="flex flex-row place-content-between">
                        <div className="flex items-center gap-2 mt-3 lg:hidden">
                          <Calendar className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-500">
                            {FormatDate(paste?.createdAt)}
                          </span>
                        </div>
                      

                      <div className="flex flex-col gap-3 lg:items-end">
                        <div className="flex gap-2 flex-wrap">
                          <button
                            className="inline-flex items-center justify-center p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group"
                            title="Edit"
                          >
                            <a href={`/?pasteId=${paste?._id}`}>
                              <PencilLine
                                className="group-hover:scale-110 transition-transform duration-200"
                                size={18}
                              />
                            </a>
                          </button>
                          
                          <button
                            className="inline-flex items-center justify-center p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 transition-all duration-200 group"
                            onClick={() => handleDelete(paste?._id)}
                            title="Delete"
                          >
                            <Trash2
                              className="group-hover:scale-110 transition-transform duration-200"
                              size={18}
                            />
                          </button>

                          <button 
                            className="inline-flex items-center justify-center p-2.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100 hover:border-orange-300 transition-all duration-200 group"
                            title="View"
                          >
                            <a href={`/pastes/${paste?._id}`} target="_blank">
                              <Eye
                                className="group-hover:scale-110 transition-transform duration-200"
                                size={18}
                              />
                            </a>
                          </button>
                          
                          <button
                            className="inline-flex items-center justify-center p-2.5 rounded-lg bg-green-50 border border-green-200 text-green-600 hover:bg-green-100 hover:border-green-300 transition-all duration-200 group"
                            onClick={() => {
                              navigator.clipboard.writeText(paste?.content);
                              toast.success("Copied to Clipboard");
                            }}
                            title="Copy"
                          >
                            <Copy
                              className="group-hover:scale-110 transition-transform duration-200"
                              size={18}
                            />
                          </button>
                        </div>

                        {/* Date - Desktop */}
                        <div className="hidden lg:flex items-center gap-2">
                          <Calendar className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-500">
                            {FormatDate(paste?.createdAt)}
                          </span>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <PencilLine className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No pastes found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? 'Try adjusting your search terms' : 'Create your first paste to get started'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;