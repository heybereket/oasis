package termoasis

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/glamour"
	"github.com/charmbracelet/lipgloss"
	author "github.com/oasis-sh/oasis/packages/tui/internal/posts/author"
	date "github.com/oasis-sh/oasis/packages/tui/internal/posts/date"
	downvotes "github.com/oasis-sh/oasis/packages/tui/internal/posts/downvotes"
	upvotes "github.com/oasis-sh/oasis/packages/tui/internal/posts/upvotes"
)

type Post struct {
	Content   string
	Author    author.Author
	CreatedAt date.Date
	Upvotes   upvotes.Upvotes
	Downvotes downvotes.Downvotes
}

// Renders an individual post, can be used to render multiple posts
// And stack them in a column
func (p Post) Render(width int) (string, error) {
	PostStyle := lipgloss.NewStyle().Align(lipgloss.Center).Bold(true).Width(width)
	BorderStyle := lipgloss.NewStyle().Align(lipgloss.Center).Border(lipgloss.RoundedBorder()).Width(int(float32(width) * 0.6))

	strippedPost := strings.ReplaceAll(p.Content, "\t", "  ")

	markdownRendered, err := glamour.Render(strippedPost, "dark")

	if err != nil {
		return "nil", err
	}

	author := p.Author.Render()
	date := p.CreatedAt.Render()

	upvotes := p.Upvotes.Render()
	downvotes := p.Downvotes.Render()

	post := fmt.Sprintf("%s - %s\n%s\n%s - %s", author, date, markdownRendered, upvotes, downvotes)
	bordered := BorderStyle.Render(post)

	return PostStyle.Render(bordered), nil
}
