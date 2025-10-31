import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import { Calendar, Clock, Star, ArrowLeft } from 'lucide-react';
import { blogPosts, BlogPost } from '@/components/data/notes';

const POSTS_PER_PAGE = 10;

const getPagePath = (pageNumber: number) =>
  pageNumber <= 1 ? '/notes/featured' : `/notes/featured/page/${pageNumber}`;

const FeaturedNotes = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page?: string }>();

  const featuredPosts = React.useMemo(
    () =>
      [...blogPosts]
        .filter((post: BlogPost) => post.featured)
        .sort(
          (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        ),
    []
  );

  const totalPages = Math.max(1, Math.ceil(featuredPosts.length / POSTS_PER_PAGE));

  const parsedPage = page ? Number.parseInt(page, 10) : 1;
  const isParsedNumber = Number.isInteger(parsedPage);
  const normalizedPage = isParsedNumber && parsedPage >= 1 ? parsedPage : 1;
  const currentPage = Math.min(normalizedPage, totalPages);

  React.useEffect(() => {
    if (!page) {
      if (!isParsedNumber || parsedPage !== 1) {
        navigate('/notes/featured', { replace: true });
      }
      return;
    }

    if (!isParsedNumber || parsedPage < 1) {
      navigate('/notes/featured', { replace: true });
      return;
    }

    if (parsedPage !== currentPage) {
      navigate(getPagePath(currentPage), { replace: true });
    }
  }, [page, isParsedNumber, parsedPage, currentPage, navigate]);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, featuredPosts.length);
  const currentPosts = featuredPosts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg flex flex-col">
      <RelativityFieldLines />
      <div className="relative z-10 flex-1 pb-24">
        <TopControls title="Featured Notes" />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-8 pt-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Notes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated highlights from my knowledge base. Browse the full archive of
              featured entries or jump into an individual note.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <Button
                variant="outline"
                className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400"
                onClick={() => navigate('/notes')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Notes
              </Button>
              <Button
                className="bg-gradient-to-r from-black-500 to-black-600 hover:from-black-600 hover:to-black-700 dark:bg-gradient-to-r dark:from-purple-500 dark:to-purple-500 dark:hover:from-purple-600 dark:hover:to-purple-600 text-white"
                onClick={() => navigate('/')}
              >
                Home
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {currentPosts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-black/60 dark:border-purple-800/40 rounded-lg bg-card/20">
                <Star className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">No featured notes yet</h2>
                <p className="text-muted-foreground">
                  Flag a note as featured to have it appear here.
                </p>
              </div>
            ) : (
              currentPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-card/30 border-black dark:border-black backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:border-black"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mt-1 flex-shrink-0" />
                      <Link
                        to={`/notes/${post.id}`}
                        className="text-xl font-semibold text-foreground hover:text-purple-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 md:p-6 flex flex-col gap-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.excerpt || 'No excerpt available'}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground border-t border-black dark:border-black pt-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.uploadDate).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {featuredPosts.length > 0 && (
            <div className="mt-12 space-y-6">
              <div className="flex justify-center items-center gap-4">
                {currentPage === 1 ? (
                  <Button
                    variant="outline"
                    disabled
                    className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    asChild
                    className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400"
                  >
                    <Link to={getPagePath(currentPage - 1)}>
                      Previous
                    </Link>
                  </Button>
                )}

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const target = getPagePath(pageNumber);

                    if (pageNumber === currentPage) {
                      return (
                        <Button
                          key={pageNumber}
                          variant="default"
                          className="bg-transparent text-purple-400 border-black hover:bg-transparent hover:text-purple-300"
                        >
                          {pageNumber}
                        </Button>
                      );
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant="outline"
                        asChild
                        className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400"
                      >
                        <Link to={target}>{pageNumber}</Link>
                      </Button>
                    );
                  })}
                </div>

                {currentPage === totalPages && featuredPosts.length <= endIndex ? (
                  <Button
                    variant="outline"
                    disabled
                    className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    asChild
                    className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400"
                  >
                    <Link to={getPagePath(currentPage + 1)}>
                      Next
                    </Link>
                  </Button>
                )}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Showing {startIndex + 1}-{endIndex} of {featuredPosts.length} featured notes
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturedNotes;
