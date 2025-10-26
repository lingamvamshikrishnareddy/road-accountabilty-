import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { roadsAPI } from '../services/api';
import RoadCard from '../components/roads/RoadCard';
import toast from 'react-hot-toast';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      const { data } = await roadsAPI.search(query);
      setResults(data.roads || []);
    } catch (error) {
      toast.error('Search failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Road Projects
          </h1>
          <p className="text-gray-600">
            Search by road name, location, contractor, or project details
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your search query..."
                  className="input-field pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Popular searches:</span>
              {['NH-44', 'Mumbai', 'Expressway', 'Delayed'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : hasSearched ? (
          results.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((road) => (
                  <RoadCard key={road.id} road={road} />
                ))}
              </div>
            </>
          )
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Your Search
            </h3>
            <p className="text-gray-600">
              Enter keywords to find road projects and related information
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;