package termoasis

import (
	"context"

	"github.com/shurcooL/graphql"
)

type PaginatedPosts struct {
	FeedSortPosts []struct {
		Message graphql.String
	} `graphql:"feedSortPosts(offset: $postsOffset, limit: $postsLimit)"`
}

func FetchPosts(client *graphql.Client, limit, offset float32) (
	// why, just why
	[]struct {
		Message graphql.String
		Author  struct {
			Id       graphql.String
			Name     graphql.String
			Username graphql.String
		}
		CreatedAt graphql.String
		Downvotes graphql.Int
		Upvotes   graphql.Int
	}, error) {
	var query struct {
		FeedSortPosts []struct {
			Message graphql.String
			Author  struct {
				Id       graphql.String
				Name     graphql.String
				Username graphql.String
			}
			CreatedAt graphql.String
			Downvotes graphql.Int
			Upvotes   graphql.Int
		} `graphql:"feedSortPosts(offset: $postsOffset, limit: $postsLimit)"`
	}

	err := client.Query(context.Background(), &query, map[string]interface{}{
		"postsOffset": graphql.Float(offset),
		"postsLimit":  graphql.Float(limit),
	})

	if err != nil {
		return nil, err
	}

	return query.FeedSortPosts, nil
}
