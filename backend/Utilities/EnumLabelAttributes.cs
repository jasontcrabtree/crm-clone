public class EnumLabelAttribute : Attribute
{
    public string Label { get; private set; }

    public EnumLabelAttribute(string label)
    {
        Label = label;
    }
}