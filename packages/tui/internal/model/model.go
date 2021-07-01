package termoasis

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	posts "github.com/oasis-sh/oasis/packages/tui/internal/posts"
	author "github.com/oasis-sh/oasis/packages/tui/internal/posts/author"
	date "github.com/oasis-sh/oasis/packages/tui/internal/posts/date"
	downvotes "github.com/oasis-sh/oasis/packages/tui/internal/posts/downvotes"
	upvotes "github.com/oasis-sh/oasis/packages/tui/internal/posts/upvotes"
	utils "github.com/oasis-sh/oasis/packages/tui/internal/utils"
	"github.com/shurcooL/graphql"
)

type Post interface {
	Render()
}

type Model struct {
	Client *graphql.Client
	Width  int
	Height int
	Posts  []struct {
		Message graphql.String
		Author  struct {
			Id       graphql.String
			Name     graphql.String
			Username graphql.String
		}
		CreatedAt graphql.String
		Downvotes graphql.Int
		Upvotes   graphql.Int
	}
	Read          int
	Ready         bool
	Viewport      viewport.Model
	RenderedPosts []string // Contains a list of rendered posts to display
}

func RenderPosts(m *Model, rerender bool) {
	if rerender {
		// overwrites the currently rendered posts
		renderedPosts := []string{}
		for _, content := range m.Posts {
			timestamp, err := utils.ConvertToTime(content.CreatedAt)
			if err != nil {
				log.Fatal(err)
				os.Exit(1)
			}

			post := &posts.Post{
				Content:   string(content.Message),
				Author:    author.Author{Username: string(content.Author.Username)},
				CreatedAt: date.Date{Timestamp: *timestamp},
				Downvotes: downvotes.Downvotes{Amount: int(content.Downvotes)},
				Upvotes:   upvotes.Upvotes{Amount: int(content.Upvotes)},
			}

			rendered, err := post.Render(m.Width)
			if err != nil {
				log.Fatal(err)
				os.Exit(1)
			}
			renderedPosts = append(renderedPosts, rendered)
		}

		m.Viewport.SetContent(strings.Join(renderedPosts, "\n"))
		m.RenderedPosts = renderedPosts
		return
	}

	for _, content := range m.Posts {
		timestamp, err := utils.ConvertToTime(content.CreatedAt)
		if err != nil {
			log.Fatal(err)
			os.Exit(1)
		}

		post := &posts.Post{
			Content:   string(content.Message),
			Author:    author.Author{Username: string(content.Author.Username)},
			CreatedAt: date.Date{Timestamp: *timestamp},
			Downvotes: downvotes.Downvotes{Amount: int(content.Downvotes)},
			Upvotes:   upvotes.Upvotes{Amount: int(content.Upvotes)},
		}

		rendered, err := post.Render(m.Width)
		if err != nil {
			log.Fatal(err)
			os.Exit(1)
		}
		m.RenderedPosts = append(m.RenderedPosts, rendered)
	}
}

func (m Model) Init() tea.Cmd {
	return nil
}

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		k := msg.String()
		if k == "ctrl+c" || k == "q" || k == "esc" {
			return m, tea.Quit
		}

	case tea.WindowSizeMsg:
		m.Height = msg.Height
		m.Width = msg.Width

		if !m.Ready && len(m.RenderedPosts) == 0 {
			RenderPosts(&m, false)

			m.Viewport = viewport.Model{Width: m.Width, Height: m.Height - 3}

			m.Viewport.YPosition = 3
			m.Viewport.SetContent(strings.Join(m.RenderedPosts, "\n"))

			m.Ready = true
		} else {
			m.Viewport.Height = msg.Height - 3
			m.Viewport.Width = msg.Width

			RenderPosts(&m, true) // Rerender the posts if the terminal size changes
		}
	}

	m.Viewport, _ = m.Viewport.Update(msg)

	return m, nil
}

func (m Model) View() string {
	if !m.Ready {
		return "\n  Initializing..."
	}

	var style = lipgloss.NewStyle().Align(lipgloss.Center).Bold(true).Width(m.Width)

	headerTop := "╭───────────╮"
	headerMid := "│ Termoasis │"
	headerBot := "╰───────────╯"
	header := style.Render(fmt.Sprintf("%s\n%s\n%s", headerTop, headerMid, headerBot))

	return fmt.Sprintf("%s\n%s", header, m.Viewport.View())
}
