package main

import (
	"fmt"
	"log"
	"os"

	tea "github.com/charmbracelet/bubbletea"
	models "github.com/oasis-sh/oasis/packages/tui/internal/model"
	posts "github.com/oasis-sh/oasis/packages/tui/internal/queries"
	"github.com/shurcooL/graphql"
)

func main() {
	client := graphql.NewClient("https://dev.oasis.sh/graphql", nil)
	// client := graphql.NewClient("http://localhost:3000/graphql", nil)

	posts, err := posts.FetchPosts(client, 10.0, 0.0)

	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

	p := tea.NewProgram(
		models.Model{Client: client, Posts: posts, Read: 10},
		tea.WithAltScreen(),
		tea.WithMouseCellMotion(),
	)

	if err := p.Start(); err != nil {
		fmt.Println("could not run program:", err)
		os.Exit(1)
	}
}
