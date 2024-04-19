using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("A title is required");
            RuleFor(x => x.Description).NotEmpty().WithMessage("A description is required");
            RuleFor(x => x.Date).NotEmpty().WithMessage("A date is required");
            RuleFor(x => x.Category).NotEmpty().WithMessage("A category is required");
            RuleFor(x => x.City).NotEmpty().WithMessage("A city is required");
            RuleFor(x => x.Venue).NotEmpty().WithMessage("A venue is required");
        }
    }
}