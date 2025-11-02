import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import { Calendar, Clock, Star, ArrowLeft, ArrowRight } from 'lucide-react';
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
    <div className="page-shell">
      <RelativityFieldLines />
      <div className="page-surface">
        <TopControls title="Featured Notes" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-40 pb-32">
          <header className="text-center">
            <span className="section-eyebrow mx-auto">Curated picks</span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-semibold leading-tight text-slate-900 dark:text-white">
              Featured Notes
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-200/80">
              Hand-picked notes that capture meaningful breakthroughs, long-form experiments, and the explorations I revisit the most.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => navigate('/notes')}>
                <ArrowLeft className="h-4 w-4" />
                All notes
              </Button>
              <Button onClick={() => navigate('/')}>Home</Button>
            </div>
          </header>

          <div className="mt-12 space-y-6">
            {currentPosts.length === 0 ? (
              <div className="glass-card flex flex-col items-center gap-4 px-10 py-16 text-center">
                <Star className="h-10 w-10 text-emerald-500 dark:text-purple-300" />
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">No featured notes yet</h2>
                <p className="max-w-sm text-sm text-slate-500 dark:text-slate-300">
                  Flag a note as featured to spotlight it here once it&apos;s ready.
                </p>
              </div>
            ) : (
              currentPosts.map((post) => {
                const published = new Date(post.uploadDate).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <Card
                    key={post.id}
                    className="group transition duration-300 hover:-translate-y-1 hover:shadow-emerald-500/25 dark:hover:shadow-purple-500/25"
                  >
                    <CardHeader className="space-y-3 pb-0">
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 flex-shrink-0 text-emerald-500 dark:text-purple-300" />
                        <Link
                          to={`/notes/${post.id}`}
                          className="text-2xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-purple-300"
                        >
                          {post.title}
                        </Link>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-emerald-600/80 dark:text-purple-200/70">
                        <div className="flex items-center gap-2 tracking-normal text-slate-500 dark:text-slate-200/70">
                          <Calendar className="h-4 w-4" />
                          {published}
                        </div>
                        <div className="flex items-center gap-2 tracking-normal text-slate-500 dark:text-slate-200/70">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6 pt-4">
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200/80">
                        {post.excerpt || 'No excerpt available'}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="ghost"
                          className="group inline-flex items-center gap-2 px-0 font-semibold text-emerald-700 hover:text-emerald-600 dark:text-purple-300 dark:hover:text-purple-200"
                          onClick={() => navigate(`/notes/${post.id}`)}
                        >
                          Read the note
                          <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {featuredPosts.length > 0 && (
            <div className="mt-12 space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {currentPage === 1 ? (
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                    <Link to={getPagePath(currentPage - 1)}>Previous</Link>
                  </Button>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const target = getPagePath(pageNumber);

                    return (
                      <Button
                        key={pageNumber}
                        variant={pageNumber === currentPage ? 'default' : 'outline'}
                        size="sm"
                        asChild={pageNumber !== currentPage}
                      >
                        {pageNumber === currentPage ? (
                          <span>{pageNumber}</span>
                        ) : (
                          <Link to={target}>{pageNumber}</Link>
                        )}
                      </Button>
                    );
                  })}
                </div>

                {currentPage === totalPages && featuredPosts.length <= endIndex ? (
                  <Button variant="outline" disabled>
                    Next
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                    <Link to={getPagePath(currentPage + 1)}>Next</Link>
                  </Button>
                )}
              </div>

              <p className="text-center text-sm text-slate-500 dark:text-slate-300">
                Page {currentPage} of {totalPages} — Showing {startIndex + 1}-{endIndex} of {featuredPosts.length} notes
              </p>
            </div>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FeaturedNotes;
