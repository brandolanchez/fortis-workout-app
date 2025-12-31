import { useState, useEffect } from 'react';

export const useHivePosts = (communityTag = 'hive-148971', limit = 10) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://api.hive.blog', {
                    method: 'POST',
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'bridge.get_ranked_posts',
                        params: {
                            sort: 'created',
                            tag: communityTag,
                            limit: limit,
                        },
                        id: 1,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });

                const json = await response.json();

                if (json.result) {
                    const formattedPosts = json.result.map((post) => {
                        // Extract the first image from json_metadata if available
                        let image = null;
                        try {
                            const metadata = JSON.parse(post.json_metadata);
                            if (metadata.image && metadata.image.length > 0) {
                                image = metadata.image[0];
                            }
                        } catch (e) {
                            console.warn('Error parsing metadata', e);
                        }

                        return {
                            title: post.title,
                            date: post.created, // ISO string
                            description: post.summary || post.body.substring(0, 150) + '...', // Hive posts might not have summary
                            slug: `@${post.author}/${post.permlink}`,
                            author: post.author,
                            image: image,
                            isHive: true, // Marker to distinguish
                            link: `https://community.fortisworkout.org/@${post.author}/${post.permlink}` // Point to custom community app
                        };
                    });
                    setPosts(formattedPosts);
                } else {
                    throw new Error('No result from Hive API');
                }
            } catch (err) {
                console.error('Failed to fetch Hive posts:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [communityTag, limit]);

    return { posts, loading, error };
};
