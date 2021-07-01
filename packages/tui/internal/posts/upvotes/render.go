package termoasis

import (
	"fmt"

	"github.com/charmbracelet/lipgloss"
)

type Upvotes struct {
	Amount int
}

func (uv Upvotes) Render() string {
	UpvotesStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("154"))

	return UpvotesStyle.Render(fmt.Sprint(uv.Amount))
}
