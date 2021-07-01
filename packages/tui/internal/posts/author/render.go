package termoasis

import "github.com/charmbracelet/lipgloss"

type Author struct {
	Username string
}

func (a Author) Render() string {
	AuthorStyle := lipgloss.NewStyle().Bold(true).Align(lipgloss.Left).Blink(true)
	rendered := AuthorStyle.Render(a.Username)
	return rendered
}
