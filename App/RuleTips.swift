import SwiftUI
import TipKit

// The one thing about this screen that is not obvious: a row's state is a
// control, not a label. HIG points at TipKit for exactly this instead of a
// tutorial screen.
struct ChangeRuleTip: Tip {
    var title: Text {
        Text("Change a rule")
    }

    var message: Text? {
        Text("Press the state to allow or block this destination, on this site or everywhere.")
    }

    var image: Image? {
        Image(systemName: "hand.tap")
    }
}
