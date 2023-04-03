use anchor_lang::prelude::*;

declare_id!("8gXmb5owBUq1Fir1XsEc7zachbU7K396F6GuW2sxLHJx");

#[program]
pub mod postfeedapp {
    use super::*;

    pub fn create_post(ctx: Context<CreatePost>, text:String, media:String, position:i64, admin: bool) -> Result<()> {
        let post = &mut ctx.accounts.feed_post_app;
        post.admin = admin;
        post.text = text;
        post.media = media;
        post.position = position;
        
        Ok(())
    }
}

#[derive(Accounts)]

pub struct CreatePost<'info> {
    #[account(init,payer=user,space=9000)]
    pub feed_post_app: Account<'info, FeedPostApp>,
    #[account(mut)]
    pub user:Signer<'info>,
    pub system_program:Program<'info, System>
}

#[account] 
pub struct FeedPostApp{
    pub text:String,
    pub media:String,
    pub position:i64,
    pub admin:bool
}