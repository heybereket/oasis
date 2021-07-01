package termoasis

import (
	"fmt"

	"github.com/charmbracelet/lipgloss"
)

type Downvotes struct {
	Amount int
}

func (dv Downvotes) Render() string {
	DownvotesStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("111"))

	return DownvotesStyle.Render(fmt.Sprint(dv.Amount))
}
